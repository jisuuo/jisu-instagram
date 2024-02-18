// const verificationEmail = ({ title: string, subTitle: string }) => `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Email Verification</title>
//         </head>
//         <body>
//             <div style="text-align: center;">
//                     <h2>이메일 본인 인증</h2>
//                     <p>아래 버튼을 클릭하여 이메일 인증을 완료하세요.</p>
//                     <a href="http://localhost:8000/api/auth/email/verify"  style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">본인 인증</a>
//             </div>
//              <script>
//                import axios from "axios";
//                async function handleVerification(event) {
//                 event.preventDefault(); // 기본 동작(링크 이동)을 막습니다.
//                 try {
//                   const response = await axios.get('http://localhost/api/auth/email/verify');
//                   console.log('이메일 인증 완료');
//                   //alert("이메일 인증이 완료되었습니다.");
//                 } catch (error) {
//                   console.error('인증 오류:', error);
//                   //alert("이메일 인증에 실패했습니다.");
//                 }
//               }
//            </script>
//         </body>
//         </html>
//     `;
