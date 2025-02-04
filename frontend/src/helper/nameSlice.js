export const nameSlicer = (firstName) => {

    if (!firstName || typeof firstName !== "string") return "";

    return firstName.charAt(0).toUpperCase();
}

