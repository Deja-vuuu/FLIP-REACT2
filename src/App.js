import React, {Component} from 'react';
import 'web-animations-js';
import './App.scss'
export default class AutoFocusInput extends Component {
  listRef= React.createRef();

  state = {
    initCardNum: 3,
    cardList: [],
    animateStatus: 0
  }
  creatCardList =(num=2)=>{
    return Array(2).fill('').map((item, index) => ({
      index
    }))
  }
  // 生成一个二维数组
  getArrByLen=(len) => {
    return Array(len).fill().map(() => [0, 0]);
  }
  add = ()=>{
    let  {cardList} = this.state;
    let list = this.listRef.current;
    let transArr=[];
    let currentCardList = Array.prototype.slice.call(this.listRef.current.children);
    transArr = this.getArrByLen(currentCardList.length);
    currentCardList.forEach((value, index) => {
      let rectInfo = value.getBoundingClientRect();
      transArr[index][0] = rectInfo.left;
      transArr[index][1] = rectInfo.top;
    });
    this.transArr = transArr
    this.newTransArr = transArr;
    cardList.unshift({
       index: 1
    })
    this.setState(
        {
          cardList:cardList,
          animateStatus: 1,
        }
    );
  }
  componentDidUpdate(){
    if(this.state.animateStatus === 1){
      let transArr =[];
      let currentCardList = Array.prototype.slice.call(this.listRef.current.children).slice();
      currentCardList = currentCardList.slice(1)
      console.log('currentCardList',currentCardList)
      transArr = this.getArrByLen(currentCardList.length);
      currentCardList.forEach((value, index) => {
        let rectInfo = value.getBoundingClientRect();
        // console.log(this.newTransArr[index],rectInfo.left)
        // console.log(this.newTransArr[index][0])
        console.log(this.transArr[index])
        console.log([rectInfo.left,rectInfo.top])
        transArr[index][0] = rectInfo.left;
        transArr[index][1] = rectInfo.top;
        let invertLeft = this.transArr[index][0] - rectInfo.left
        let invertTop = this.transArr[index][1] - rectInfo.top
        const keyframes = [
          {
            transform: `translate(${invertLeft}px, ${invertTop}px)`,
          },
          { transform: "translate(0)" },
        ]
        const options = {
          duration: 1000,
          easing: "cubic-bezier(0,0,0.32,1)",
        }
        const animation = value.animate(keyframes, options)
      });
      this.setState({
        animateStatus: 2
      });
    }
    if(this.state.animateStatus === 2){
      // requestAnimationFrame(() => {
      //   this.setState({
      //     animateStatus: 3
      //   });
      // });
    }
  }
  componentDidMount() {
    let cardList = this.creatCardList();
    this.setState(
        {
          cardList:cardList
        },()=>{
          this.add()
        }
    );
  }

  render() {
    let { cardList } = this.state;
    return <div className='page'>
      <div onClick={this.add}>
        新增
      </div>
      <div className='card-container' ref={this.listRef}>
        {
          cardList.map((value,index)=>{
            return  <div className='card-item' id={index} key={index} style={{
              zIndex: 9999-index
            }}>
              <div className='title'>
                {
                  index
                }
              </div>
            </div>
          })
        }
      </div>
    </div>
  }
}