var temp1 = 0;

for (let x = 1; x != 10; x++) {
    var temp = {};
    for (let y = 1; y != 10; y++) {
        temp[y - 1] = x * y;
    }


    for (let y = 1; y != 10; y++) {


        if (temp1 == 0) {
            process.stdout.write("     ")
            for (let q = 1; q != 10; q++) {
                process.stdout.write("(" + JSON.stringify(temp[q - 1]) + ")");
                process.stdout.write("      ")
            }
            console.log("\n");
        }

        temp1++;

        if (y == 1)
            process.stdout.write("(" + JSON.stringify(temp[y - 1]) + ")  ");

        process.stdout.write(JSON.stringify(temp[y - 1]));

        if (temp[y - 1] < 10) {
            process.stdout.write("        ")
        } else {
            process.stdout.write("       ")
        }
    }


    console.log("\n");

}