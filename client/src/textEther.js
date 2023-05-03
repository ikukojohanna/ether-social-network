import { Text } from "@react-three/drei";

export default function TextEther() {
    return (
        <>
            <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                color="white" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[0, 0, 0]}
                position={[-10, 7.5, 0]}
                fontSize={1}
            >
                Arrakis{" "}
            </Text>
            <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                color="white" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[0, 0, 0]}
                position={[-20, 7.5, 5]}
                fontSize={1}
            >
                Solaris{" "}
            </Text>
            <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                color="white" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[0, 0, 0]}
                position={[-30, 7.5, 10]}
                fontSize={1}
            >
                Philia
            </Text>
            <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                color="white" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[0, 0, 0]}
                position={[10, 7.5, 0]}
                fontSize={1}
            >
                LV-426
            </Text>
            <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                color="white" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[0, 0, 0]}
                position={[20, 7.5, 5]}
                fontSize={1}
            >
                Dagobah
            </Text>
            <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                color="white" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[0, 0, 0]}
                position={[30, 7.5, 10]}
                fontSize={1}
            >
                Vogsphere
            </Text>
            <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                color="white" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[Math.PI / 2, Math.PI, 0]}
                position={[-10, 3, -3]}
                fontSize={1}
                onClick={() => history.push({}, "", "arrakis")}
            ></Text>
            <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                color="white" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[Math.PI / 2, Math.PI / 2, Math.PI / -2]}
                position={[12.1, 3, 0]}
                fontSize={0.3}
            ></Text>
        </>
    );
}

/*
           
            <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                color="pink" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[0, 0, 0]}
                position={[50, 42, -50]}
                fontSize={2}
            >
                {" "}
                Logout
            </Text>

            <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                color="pink" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[0, 0, 0]}
                position={[-50, 37.5, -40]}
                fontSize={1.9}
            >
                {" "}
                Profile
            </Text>

            <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                color="pink" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[0, 0, 0]}
                position={[-7, 22, 0]}
                fontSize={1.2}
            >
                {" "}
                Friends{" "}
            </Text>

            <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                color="pink" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[0, 0, 0]}
                position={[2, 19.5, 0]}
                fontSize={1.2}
            >
                {" "}
                Search{" "}
            </Text>

            <Text
                color="white" // default
                anchorX="center" // default
                anchorY="middle" // default
                rotation={[0, 0, 0]}
                position={[0, 7.5, 0]}
                fontSize={2}
            >
                {" "}
            </Text>
*/
