// Function to obtain user location
export const getUserLocation = async (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
        // Getting the location
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                resolve([coords.longitude, coords.latitude]);
            },
            (err: unknown) => {
                alert("Cannot obtain location");
                console.log(err);
                reject(err); // Pass the error to reject
            }
        );
    });
};
