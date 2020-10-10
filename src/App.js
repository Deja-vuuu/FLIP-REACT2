import React, {Component} from 'react';
import 'web-animations-js';
import './App.scss'
export default class FLIP extends Component {

  listRef= React.createRef();
  activeCardList =[]
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
  /**
   * 新增卡片
   * @param num 新增卡片数量 默认新增一个
   */
  add = (num = 1)=>{
    let  {cardList} = this.state;
    let cardListRef = this.listRef.current;
    let currentCardList = Array.prototype.slice.call(cardListRef.children);
    this.transArr = this.getArrByLen(currentCardList.length);
    currentCardList.forEach((value, index) => {
      let rectInfo = value.getBoundingClientRect();
      this.transArr[index].left = rectInfo.left;
      this.transArr[index].top = rectInfo.top;
    });
    let addList = this.getArrByLen(num)
    let newCardList = cardList.concat(addList)
    this.addNum = num
    this.setState(
        {
          cardList:newCardList,
          animateStatus: 1,
        }
    );
  }
  /**
   * 删除卡片
   * @param delIndex 删除卡片的索引
   */
  del = (delIndex)=>{
    let  {cardList} = this.state;
    let cardListRef = this.listRef.current;
    let currentCardList = Array.prototype.slice.call(cardListRef.children).slice(delIndex+1);
    this.transArr = this.getArrByLen(currentCardList.length + 1);
    currentCardList.forEach((value, index) => {
      let rectInfo = value.getBoundingClientRect();
      this.transArr[index+1].left = rectInfo.left;
      this.transArr[index+1].top = rectInfo.top;
    });
    let newCardList = cardList.filter((value, index) => index !== delIndex)
    this.delIndex = delIndex
    this.setState(
        {
          cardList:newCardList,
          animateStatus: 2,
        }
    );
  }
  componentDidUpdate(prevProps, prevState){
    if(this.state.animateStatus === 1){
      let currentCardList = Array.prototype.slice.call(this.listRef.current.children);
      // 位置需要进行改变的节点（可以大致认为位于当前变化节点之前的所有节点，位置完全不变）
      let activeCardList = currentCardList.slice(this.addNum)
      activeCardList.forEach((value, index) => {
        let rectInfo = value.getBoundingClientRect();
        let invertLeft = this.transArr[index].left - rectInfo.left
        let invertTop = this.transArr[index].top - rectInfo.top
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
        value.animate(keyframes, options)
      });
    }
    if(this.state.animateStatus === 2){
      let currentCardList = Array.prototype.slice.call(this.listRef.current.children);
      currentCardList = currentCardList.slice(this.delIndex)
      // 位置需要进行改变的节点（可以大致认为位于当前变化节点之前的所有节点，位置完全不变）
      currentCardList.forEach((value, index) => {
        let rectInfo = value.getBoundingClientRect();
        let invertLeft = this.transArr[index+1].left - rectInfo.left
        let invertTop = this.transArr[index+1].top - rectInfo.top
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
        value.animate(keyframes, options)
      });
    }
  }
  componentDidMount() {
    let a = Array(3).fill({
      a:1,
      b:2
    });
    console.log(a)
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
      <div onClick={()=>{
        this.add(1)
      }}>
        新增
      </div>
      <div onClick={()=>{
        this.add(2)
      }}>
        新增
      </div>
      <div className='card-container' ref={this.listRef}>
        {
          cardList.map((value,index)=>{
            return  <div className='card-item' id={index} key={index}
                         style={{
              zIndex: 9999-index
            }}
            onClick={()=>{
              this.del(index)
            }}
            >
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