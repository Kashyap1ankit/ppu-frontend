// import { useEffect, useState, useRef } from "react";
// import "./App.css";
// import axios from "axios";

// function App() {
//   const pdfref = useRef();
//   const [data, setData] = useState("");
//   useEffect(() => {
//     const res = async () => {
//       const response = await axios.get("http://localhost:5000", {
//         responseType: "arraybuffer",
//       });

//       const blob = new Blob([response.data], {
//         type: "application/pdf",
//       });
//       const url = URL.createObjectURL(blob);
//       pdfref.current.src = url;
//     };
//     res();
//   }, []);
//   return (
//     <div>
//       <iframe
//         ref={pdfref}
//         width="100%"
//         height="600px"
//         title="PDF Viewer"
//       ></iframe>
//     </div>
//   );
// }

// export default App;

import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const pdfRef = useRef();
  let timer = useRef(null);
  const [roll, setRoll] = useState(2320140080021);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(`http://localhost:5000?roll=${roll}`, {
          responseType: "arraybuffer",
          headers: {
            Accept: "application/pdf",
          },
        });
        console.log(response);
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });
        const url = URL.createObjectURL(blob);
        console.log(url);
        pdfRef.current.src = url;
      } catch (error) {
        console.error("Error fetching the PDF:", error);
      }
    };

    fetchPdf();
  }, [roll]);

  function debounce(value) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setRoll(value);
    }, 2000);
  }

  return (
    <div>
      <div>
        <input
          type="number"
          onChange={(e) => {
            debounce(e.target.value);
          }}
        />
      </div>

      <iframe
        ref={pdfRef}
        width="100%"
        height="900px"
        title="PDF Viewer"
      ></iframe>
    </div>
  );
}

export default App;
