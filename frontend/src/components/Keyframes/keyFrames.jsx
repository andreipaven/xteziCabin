import { keyframes } from "@emotion/react";

export const driveToRight = keyframes`
    0% {
        opacity: 1;
        transform: translateX(0) scaleX(-1);
    }
    80% {
        opacity: 1;
        transform: translateX(80%) scaleX(-1);
    }
    90% {
        opacity: 0;
        transform: translateX(90%) scaleX(-1);
    }
    100% {
        opacity: 0;
        transform: translateX(0) scaleX(-1);
    }
`;

export const smokeToLeft = keyframes`
    0% {
        opacity: 1;
        transform: translateX(0) scaleX(-1);
    }
    100% {
        opacity: 0;
        transform: translateX(-20px) scaleX(-1) scale(1.5);
    }
`;

export const sleepFloat = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10px) scale(0.8);
    }
    10% {
        opacity: 1;
    }
    80% {
        opacity: 1;
        transform: translateY(-10px) scale(1.2);
    }
    100% {
        opacity: 0;
        transform: translateY(-12px) scale(1.3);
    }
`;
