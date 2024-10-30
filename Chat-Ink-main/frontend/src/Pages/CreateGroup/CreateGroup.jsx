import { useEffect, useState } from "react";
import SecondPage from "./SecondPage/SecondPage.jsx";
import FirstPage from "./FirstPage/FirstPage";
import ThirdPage from "./ThirdPage/ThirdPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [participant, setParticipant] = useState([]);
  return (
    <div>
      {currentPage === 0 && (
        <FirstPage setCurrentPage={setCurrentPage}></FirstPage>
      )}

      {currentPage === 1 && (
        <SecondPage
          setCurrentPage={setCurrentPage}
          setParticipant={setParticipant}
          participant={participant}
        ></SecondPage>
      )}

      {currentPage === 2 && <ThirdPage participant={participant} />}
    </div>
  );
}
// import { useEffect, useState } from "react";
// import SecondPage from "./SecondPage/SecondPage.jsx";
// import FirstPage from "./FirstPage/FirstPage";
// export default function App() {
//   return (
//     <div>
//       <FirstPage></FirstPage>
//     </div>
//   );
// }
