const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1", // Make sure this corresponds to the region in which you have verified your email address (or 'eu-west-1' if you are using the Spiced credentials)
});

//will be DYNAMIC: recipient, message, subject
exports.sendEmail = (recipient, message, subject) => {
    console.log("who wants to reset their eaiml: ", recipient);
    console.log("");
    return ses
        .sendEmail({
            Source: "Plausible Feeling <plausible.feeling@spicedling.email>", //here we put our email that is spiced provided
            Destination: {
                ToAddresses: [recipient], // array because we can send several at the same time
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise()
        .then(() => console.log("it worked! you've got mail"))
        .catch((err) =>
            console.log("something went wront sending the email", err)
        );
};
