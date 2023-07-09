import { db } from "@/lib/db";
import { QuestionForm } from "@/components/Question-Form";

const CreateQuestionPage = async () => {
  const subjects = await db.subject.findMany({
    orderBy: {
      createdAt: 'desc',
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <QuestionForm initialData={null} subjects={subjects} />
      </div>
    </div>
  );
}

export default CreateQuestionPage;
// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useState } from 'react';
// import axios from 'axios';

// export default function CreateQuestionPage() {
//   const [description, setDescription] = useState('');
//   const [options, setOptions] = useState(['', '', '', '']);
//   const [correctOption, setCorrectOption] = useState(0);

//   const handleOptionChange = (index: number, value: string) => {
//     const updatedOptions = [...options];
//     updatedOptions[index] = value;
//     setOptions(updatedOptions);
//   };

//   const handleCreateQuestion = async () => {
//     try {
//       const response = await axios.post('/api/question', {
//         subjectId: 'clj7b25dr0000vbgis65r1m7l', // Replace with the actual subject ID
//         description,
//         options,
//         correctOption,
//       });

//       console.log('Question created:', response.data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <label>
//         Description:
//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </label>
//       <label>
//         Options:
//         {options.map((option, index) => (
//           <input
//             key={index}
//             type="text"
//             value={option}
//             onChange={(e) => handleOptionChange(index, e.target.value)}
//           />
//         ))}
//       </label>
//       <label>
//         Correct Option:
//         <select
//           value={correctOption}
//           onChange={(e) => setCorrectOption(Number(e.target.value))}
//         >
//           {options.map((_, index) => (
//             <option key={index} value={index}>
//               {index + 1}
//             </option>
//           ))}
//         </select>
//       </label>
//       <button type="button" onClick={handleCreateQuestion}>
//         Create Question
//       </button>
//     </div>
//   );
// }
