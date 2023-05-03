const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    //this mean we are running locally
    secrets = require("./secrets.json");
}
//console.log("secrets: ", secrets);

//Create an instance of an AWS user - an object that gives us a bunch of methods to communicate /and interact with our s3 cloud storage that amazon calls bucket

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log("no file on request body");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            console.log("yay it worked out image is in the cloud");
            //here we want to continue normal post route.
            //because middleware of uploadung was successful
            next();
            fs.unlink(path, () => {
                console.log("remove uploaded file");
            });
        })
        .catch((err) => {
            console.log("something went wrong wth cloud upload", err);
            return res.sendStatus(500);
        });
};
