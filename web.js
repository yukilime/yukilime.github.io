//WASM
createModule().then((Module) => {

  console.log("WASM READY");

  //----------------------FILE NAMES---------------------------
    document.getElementById("file1").onchange = (e) => {
        document.getElementById("file1-name").textContent =
            e.target.files.length ? e.target.files[0].name : "Not chosen";
    };

    document.getElementById("file2").onchange = (e) => {
        document.getElementById("file2-name").textContent =
            e.target.files.length ? e.target.files[0].name : "Not chosen";
    };

    document.getElementById("file3").onchange = (e) => {
        document.getElementById("file3-name").textContent =
            e.target.files.length ? e.target.files[0].name : "Not chosen";
    };
  //------------------------------------------------------------

  document.getElementById("run").onclick = async () => {

    console.log("RUN CLICKED");

    const f1 = document.getElementById("file1").files[0];
    document.getElementById("file1").onchange = (e) => {
    console.log("file1 changed", e.target.files);
    document.getElementById("file1-name").textContent =
        e.target.files.length ? e.target.files[0].name : "Not chosen";
};
    const f2 = document.getElementById("file2").files[0];
    const f3 = document.getElementById("file3").files[0];

    if (!f1 || !f2 || !f3) {
        alert("Please select all 3 files");
        return;
    }

    const b1 = new Uint8Array(await f1.arrayBuffer());
    const b2 = new Uint8Array(await f2.arrayBuffer());
    const b3 = new Uint8Array(await f3.arrayBuffer());

    Module.FS.writeFile("caida.txt", b1);
    Module.FS.writeFile("ann.csv", b2);
    Module.FS.writeFile("rov.txt", b3);

    Module.callMain(["caida.txt", "ann.csv", "rov.txt", "output.csv"]);

    const outBytes = Module.FS.readFile("output.csv");

    const blob = new Blob([outBytes], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "output.csv";
    a.click();
    URL.revokeObjectURL(url);
    
  };
});