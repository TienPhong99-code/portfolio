if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule(
    "https://unpkg.com/css-houdini-ringparticles/dist/ringparticles.js",
  );

  //   let isInteractive = false;
  //   const welcome = document.querySelector("#welcome");

  //   welcome.addEventListener("pointermove", (e) => {
  //     const rect = welcome.getBoundingClientRect();
  //     const x = ((e.clientX - rect.left) / rect.width) * 100;
  //     const y = ((e.clientY - rect.top) / rect.height) * 100;

  //     if (!isInteractive) {
  //       welcome.classList.add("interactive");
  //       isInteractive = true;
  //     }

  //     welcome.style.setProperty("--ring-x", x);
  //     welcome.style.setProperty("--ring-y", y);
  //     welcome.style.setProperty("--ring-interactive", 1);
  //   });

  //   welcome.addEventListener("pointerleave", () => {
  //     welcome.classList.remove("interactive");
  //     isInteractive = false;
  //     welcome.style.setProperty("--ring-x", 50);
  //     welcome.style.setProperty("--ring-y", 50);
  //     welcome.style.setProperty("--ring-interactive", 0);
  //   });
}
