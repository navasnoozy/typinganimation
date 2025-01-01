import "./css/style.css";
import Typewriter from "./typewriter";

const typewriter = new Typewriter(
  document.querySelector(".whitespace") as HTMLDivElement,
  {
    loop: true,
    typingSpeed: 10,
    deletingSpeed: 10,
  }
);

typewriter
.typeString('how quantum particles communicate')
.puaseFor(1000)
.typeString('\n\nwhy quantum particles not respecting future and past?')
.puaseFor(1000)
.deleteChars(1000)
.start()
