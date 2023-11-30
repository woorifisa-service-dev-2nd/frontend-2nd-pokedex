import { addHtml } from "./app";
import { getPocketmonList } from "./poketmonList";

const poketmonCard = document.getElementsByClassName(`pokemonId`);
const start = 9;
const end = 10;

//관찰할 대상(target)이 등록되거나 가시성(보이는지, 보이지 않는지)에 변화가 생기면 관찰자는 콜백(callback)을 실행한다.
const loadNewPoketMon = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.intersectionRatio >0){// == entry.insIntersecting
            
        try{//3열이어서 3개 불러올것 같음; 아니면 start end 수정
            getPocketmonList(start, end).forEach(element => {
                addHtml(element);
            });
            }catch{
                try{
                //재시도
                getPocketmonList(start, end).forEach(element => {
                addHtml(element);
            })
            }catch{console.log(`카드를 추가 할 수 없습니다.`)}
            //addHtml()
            }    
        }
    })
    
};
// observer.unobserve(element); // 특정 대상(요소)에 대한 관찰 중단

const scrollOpts = {
    root: null, //타켓의 가시성을 검사하기 위해 뷰포트 대신 사용할 요소 객체(루트 요소)를 지정한다. null(뷰포트) 이다.
    rootMargin: '0px 0px 0px 0px',//바깥 여백(margin)을 이용해 root 범위를 확장하거나 축소
    threshold: 0.6,//40%가려지면 콜백 수행
};
const observer = new IntersectionObserver(loadNewPoketMon, scrollOpts); // 관찰자 초기화
observer.observe(poketmonCard);
// 관찰자(observer)가 최초로 타겟을 관측하도록 요청받을 때도 콜백 호출?