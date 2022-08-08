document.addEventListener('DOMContentLoaded', () => {
  search("N");
  var loder = document.getElementById("topLoader");
  loder.style.display = "none";
})

document.querySelector("#searchButton").addEventListener("click", () => {
  search("Y");
});

document.getElementById("searchWord").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
    e.preventDefault();
    search("Y");
  }
});

function search(defaultValue) {

  var dictInput;
  if (defaultValue == "N") {
    dictInput = "Apple";
  } else {
    dictInput = document.querySelector("#searchWord").value.trim();
  }
  if (!dictInput) {
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${dictInput}`)
    .then((response) => response.json())
    .then((data) => {
      var org = data;
      var dataString = JSON.stringify(org);

      var nm = 1;
      const spellBar = document.querySelector("#spellBar");
      spellBar.innerHTML = "";

      org[0].phonetics.forEach((element) => {
        const spellCard = document.createElement("div");
        spellCard.classList.add("spellCard");

        if (element.audio) {
          const spAudioId = `spAudio${nm}`;
          nm++;

          const spAudio = document.createElement("audio");
          spAudio.classList.add(spAudioId);
          spAudio.classList.add("hidden");
          spAudio.src = `${element.audio}`;

          const btn = document.createElement("button");
          btn.innerHTML = `
          <svg width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 700 700" width="700pt" height="700pt">
            <defs>
              <clipPath id="_clipPath_wiDUAU3vKhf4s7OU8RHdo1ePikWk0BoK">
                <rect width="700" height="700" />
              </clipPath>
            </defs>
            <g clip-path="url(#_clipPath_wiDUAU3vKhf4s7OU8RHdo1ePikWk0BoK)">
              <path d=" M 116.67 419.994 C 110.479 419.994 104.545 417.537 100.17 413.159 C 95.795 408.784 93.334 402.85 93.334 396.663 L 93.334 303.327 C 93.334 294.991 97.783 287.288 105.002 283.12 C 112.221 278.952 121.115 278.952 128.334 283.12 C 135.553 287.288 140.002 294.991 140.002 303.327 L 140.002 396.663 C 140.002 402.85 137.545 408.784 133.166 413.159 C 128.791 417.537 122.857 419.994 116.67 419.994 L 116.67 419.994 Z " fill="rgb(64,78,255)" />
              <path d=" M 233.33 513.324 C 227.142 513.324 221.209 510.867 216.834 506.492 C 212.455 502.117 209.998 496.18 209.998 489.992 L 209.998 209.992 C 209.998 201.657 214.447 193.953 221.666 189.785 C 228.885 185.617 237.779 185.617 244.998 189.785 C 252.217 193.953 256.666 201.656 256.666 209.992 L 256.666 489.992 C 256.666 496.18 254.205 502.117 249.83 506.492 C 245.455 510.867 239.521 513.324 233.33 513.324 L 233.33 513.324 Z " fill="rgb(64,78,255)" />
              <path d=" M 583.33 419.994 C 577.142 419.994 571.209 417.537 566.834 413.159 C 562.455 408.784 559.998 402.85 559.998 396.663 L 559.998 303.327 C 559.998 294.991 564.447 287.288 571.666 283.12 C 578.885 278.952 587.779 278.952 594.998 283.12 C 602.217 287.288 606.666 294.991 606.666 303.327 L 606.666 396.663 C 606.666 402.85 604.205 408.784 599.83 413.159 C 595.455 417.537 589.521 419.994 583.33 419.994 L 583.33 419.994 Z " fill="rgb(64,78,255)" />
              <path d=" M 466.67 513.324 C 460.479 513.324 454.545 510.867 450.17 506.492 C 445.795 502.117 443.334 496.18 443.334 489.992 L 443.334 209.992 C 443.334 201.657 447.783 193.953 455.002 189.785 C 462.221 185.617 471.115 185.617 478.334 189.785 C 485.553 193.953 490.002 201.656 490.002 209.992 L 490.002 489.992 C 490.002 496.18 487.545 502.117 483.166 506.492 C 478.791 510.867 472.857 513.324 466.67 513.324 L 466.67 513.324 Z " fill="rgb(64,78,255)" />
              <path d=" M 350 606.664 C 343.812 606.664 337.875 604.204 333.5 599.829 C 329.125 595.454 326.668 589.52 326.668 583.329 L 326.668 116.669 C 326.668 108.333 331.113 100.63 338.332 96.462 C 345.551 92.294 354.449 92.294 361.668 96.462 C 368.887 100.63 373.332 108.333 373.332 116.669 L 373.332 583.329 C 373.332 589.52 370.875 595.454 366.5 599.829 C 362.125 604.204 356.188 606.664 350 606.664 Z " fill="rgb(64,78,255)" />
            </g>
          </svg>`;
          btn.addEventListener("click", () => {
            if (spAudio.paused) {
              spAudio.play();
            }
          });

          const audioBtn = document.createElement("span");
          audioBtn.classList.add("spellAudio");
          audioBtn.appendChild(btn);

          const audioDetail = document.createElement("span");
          audioDetail.classList.add("spellDetail");

          const audioDisc = document.createElement("div");
          audioDisc.classList.add("spellDiscription");
          if (element.text) {
            audioDisc.innerText = element.text;
          } else {
            audioDisc.classList.add("thinItalics");
            audioDisc.innerText = "No Text Found";
          }

          const audioTitle = document.createElement("div");
          audioTitle.classList.add("spellTitle");
          if (element.audio) {
            audioTitle.innerText = element.audio
              .substring(
                element.audio.lastIndexOf("/") + 1,
                element.audio.lastIndexOf(".")
              )
              .toUpperCase();
          } else {
            audioTitle.classList.add("thinItalics");
            audioTitle.innerText = "No audio Found";
          }

          audioDetail.appendChild(audioTitle);
          audioDetail.appendChild(audioDisc);

          spellCard.appendChild(audioBtn);
          spellCard.appendChild(audioDetail);
          spellBar.appendChild(spellCard);
        } else {
          const btn = document.createElement("button");
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 700 700" width="700pt" height="700pt">
          <defs>
            <clipPath id="_clipPath_7TtCYHgnhfvxG2PSpxkDiaeghShUDhWk">
              <rect width="700" height="700" />
            </clipPath>
          </defs>
          <g clip-path="url(#_clipPath_7TtCYHgnhfvxG2PSpxkDiaeghShUDhWk)">
            <clipPath id="_clipPath_7lmDurgYtly8WTyJjB5u1Hhv5eS4A04s">
              <rect x="0" y="0" width="700" height="700" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)" />
            </clipPath>
            <g clip-path="url(#_clipPath_7lmDurgYtly8WTyJjB5u1Hhv5eS4A04s)">
              <g>
                <path d=" M 116.67 419.994 C 110.479 419.994 104.545 417.537 100.17 413.159 C 95.795 408.784 93.334 402.85 93.334 396.663 L 93.334 303.327 C 93.334 294.991 97.783 287.288 105.002 283.12 C 112.221 278.952 121.115 278.952 128.334 283.12 C 135.553 287.288 140.002 294.991 140.002 303.327 L 140.002 396.663 C 140.002 402.85 137.545 408.784 133.166 413.159 C 128.791 417.537 122.857 419.994 116.67 419.994 L 116.67 419.994 Z " fill="rgb(64,78,255)" />
                <path d=" M 233.33 513.324 C 227.142 513.324 221.209 510.867 216.834 506.492 C 212.455 502.117 209.998 496.18 209.998 489.992 L 209.998 209.992 C 209.998 201.657 214.447 193.953 221.666 189.785 C 228.885 185.617 237.779 185.617 244.998 189.785 C 252.217 193.953 256.666 201.656 256.666 209.992 L 256.666 489.992 C 256.666 496.18 254.205 502.117 249.83 506.492 C 245.455 510.867 239.521 513.324 233.33 513.324 L 233.33 513.324 Z " fill="rgb(64,78,255)" />
                <path d=" M 583.33 419.994 C 577.142 419.994 571.209 417.537 566.834 413.159 C 562.455 408.784 559.998 402.85 559.998 396.663 L 559.998 303.327 C 559.998 294.991 564.447 287.288 571.666 283.12 C 578.885 278.952 587.779 278.952 594.998 283.12 C 602.217 287.288 606.666 294.991 606.666 303.327 L 606.666 396.663 C 606.666 402.85 604.205 408.784 599.83 413.159 C 595.455 417.537 589.521 419.994 583.33 419.994 L 583.33 419.994 Z " fill="rgb(64,78,255)" />
                <path d=" M 466.67 513.324 C 460.479 513.324 454.545 510.867 450.17 506.492 C 445.795 502.117 443.334 496.18 443.334 489.992 L 443.334 209.992 C 443.334 201.657 447.783 193.953 455.002 189.785 C 462.221 185.617 471.115 185.617 478.334 189.785 C 485.553 193.953 490.002 201.656 490.002 209.992 L 490.002 489.992 C 490.002 496.18 487.545 502.117 483.166 506.492 C 478.791 510.867 472.857 513.324 466.67 513.324 L 466.67 513.324 Z " fill="rgb(64,78,255)" />
                <path d=" M 350 606.664 C 343.812 606.664 337.875 604.204 333.5 599.829 C 329.125 595.454 326.668 589.52 326.668 583.329 L 326.668 116.669 C 326.668 108.333 331.113 100.63 338.332 96.462 C 345.551 92.294 354.449 92.294 361.668 96.462 C 368.887 100.63 373.332 108.333 373.332 116.669 L 373.332 583.329 C 373.332 589.52 370.875 595.454 366.5 599.829 C 362.125 604.204 356.188 606.664 350 606.664 Z " fill="rgb(64,78,255)" />
                <path d=" M 168.511 554.788 C 164.135 549.851 161.676 543.151 161.676 536.17 C 161.676 529.188 164.135 522.493 168.513 517.554 L 498.491 145.214 C 504.386 138.562 512.976 135.963 521.027 138.397 C 529.079 140.832 535.371 147.931 537.528 157.017 C 539.686 166.102 537.382 175.795 531.488 182.446 L 201.509 554.786 C 197.131 559.726 191.198 562.5 185.011 562.5 C 178.824 562.5 172.886 559.726 168.511 554.788 Z " fill="rgb(64,78,255)" />
              </g>
            </g>
          </g>
        </svg>`;

          // const prnt = document.getElementById("");
          // prnt.appendChild(btn);
          // <div class="spellCard">
          //   <span class="spellAudio">
          //     <button>@</button>
          //   </span>
          //   <span class="spellDetail">
          //     <div class="spellTitle">US</div>
          //     <div class="spellDiscription">/'gsj/</div>
          //   </span>
          // </div>;

          const audioBtn = document.createElement("span");
          audioBtn.classList.add("spellAudio");
          audioBtn.appendChild(btn);

          const audioDetail = document.createElement("span");
          audioDetail.classList.add("spellDetail");

          const audioDisc = document.createElement("div");
          audioDisc.classList.add("spellDiscription");
          if (element.text) {
            audioDisc.innerText = element.text;
          } else {
            audioDisc.classList.add("thinItalics");
            audioDisc.innerText = "No Text Found";
          }

          const audioTitle = document.createElement("div");
          audioTitle.classList.add("spellTitle");
          if (element.audio) {
            audioTitle.innerText = element.audio
              .substring(
                element.audio.lastIndexOf("/") + 1,
                element.audio.lastIndexOf(".")
              )
              .toUpperCase();
          } else {
            audioTitle.classList.add("thinItalics");
            audioTitle.innerText = "No audio Found";
          }

          audioDetail.appendChild(audioTitle);
          audioDetail.appendChild(audioDisc);

          spellCard.appendChild(audioBtn);
          spellCard.appendChild(audioDetail);
          spellBar.appendChild(spellCard);
        }
      });

      
      var word = org[0].word;
      var phonetic = org[0].phonetic;

      document.querySelector("#resultWord").innerText = word.toUpperCase();
      document.querySelector("#resultSpell").innetText = phonetic;
      // document.querySelector("").innerText = ;
      // document.querySelector("").innerText = ;
      // document.querySelector("").innerText = ;
    });
}

console.log("Started");
