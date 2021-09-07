var height = 5;
for (let x = 0; x < height; x++) {
    for (let y = 0; y <= x - 1; y++) {
        process.stdout.write("*");

    }
    console.log("*");
}