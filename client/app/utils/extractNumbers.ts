import verifyString from "./verifier";

export function extractNumbers(s: string): number[] {
    const numbers: number[] = [];
    if (!verifyString(s)) {
        return [0];
    }
    else {
        let parts = s.split(',');
        for (let part of parts) {
            let numStr = part.trim().split(' ').join('');
            if (numStr !== '') {
                let num = parseInt(numStr);
                numbers.push(num);
            }
        }
        numbers.sort((a, b) => a - b);
        return numbers;
    }
}

