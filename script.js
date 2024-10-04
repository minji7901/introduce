// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: "AIzaSyCJlLQQSTIIabRjIR4ycrfvk-Kp_kALxk4",
  authDomain: "introduce-631df.firebaseapp.com",
  projectId: "introduce-631df",
  storageBucket: "introduce-631df.appspot.com",
  messagingSenderId: "799234648712",
  appId: "1:799234648712:web:d57c5b838db8d77422cd3d",
  measurementId: "G-C28X1H44HH"
};


// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const guestbookBtn = document.querySelector('.ilchonpyeong-btn');
guestbookBtn.addEventListener('click', async function (event) {
  event.preventDefault();
  let comment = document.querySelector('.ilchonpyeong').value;

  if (comment.trim()) {
    try {
      await addDoc(collection(db, 'ilchonpyeong'), { comment });
      alert('작성완료!');
      window.location.reload();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  } else {
    alert('댓글을 입력해 주세요.');
  }
});

const introTextDiv = document.querySelector('.intro-text');
try {
  const querySnapshot = await getDocs(collection(db, 'ilchonpyeong'));
  querySnapshot.forEach(doc => {
    const row = doc.data();
    const comment = row.comment;
    const pElement = document.createElement('p');
    pElement.textContent = comment;
    introTextDiv.prepend(pElement);
  });
} catch (error) {
  error(err)
}

const tabBtn = document.querySelectorAll('.side-bar a');
const tabCont = document.querySelectorAll('.box> div')
tabBtn.forEach((item,i) => {
  item.addEventListener('click',(e)=> {
    e.preventDefault();
    tabCont.forEach(data => {
      data.classList.remove('on')
    })
    tabBtn.forEach((data)=> {
      data.classList.remove('on')
    })
    tabBtn[i].classList.add('on');
    tabCont[i].classList.add('on')
  })
});

document.querySelectorAll('.info-date > strong').forEach((el) => {
  el.innerHTML = new Date().getDate();
});
document.querySelectorAll('.info-date p').forEach((el) => {
  const days = ['일', '월', '화', '수', '목', '금', '토']; 
  el.innerHTML = days[new Date().getDay()];
});