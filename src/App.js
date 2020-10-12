import React, {Component} from 'react';
import 'web-animations-js';
import './App.scss'
let activeList = null
export default class FLIP extends Component {

  listRef= React.createRef();
  activeCardList =[]

  state = {
    initCardNum: 4,
    cardList: [],
    animateStatus: 0
  }
  creatCardList =(num=2)=>{
    return Array(num).fill('').map((item, index) => ({
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
    let activeCardList = Array.prototype.slice.call(cardListRef.children).slice(delIndex)
    console.log('activeCardList',activeCardList)
    this.transArr = this.getArrByLen(this.activeCardList.length);
    activeCardList.forEach((value, index) => {
      let rectInfo = value.getBoundingClientRect();
      this.transArr[index].left = rectInfo.left;
      this.transArr[index].top = rectInfo.top;
    });
    console.log(' this.transArr', this.transArr)
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
    const currentCardList = Array.prototype.slice.call(this.listRef.current.children);
    const {animateStatus} = this.state;
    let activeCardList=[];
    // 位置需要进行改变的节点（当前变化节点之前的所有节点，位置完全不变）
    switch (animateStatus){
      case 1:
        activeCardList = currentCardList.slice(this.addNum)
        break;
      case 2:
        activeCardList = currentCardList.slice(this.delIndex)
        break;
      // default:
      //   break;
    }
    console.log('activeCardList',activeCardList, this.transArr)
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
  disorder = ()=>{
    console.log(11)
  }
  componentDidMount() {
    let cardList = this.creatCardList(this.state.initCardNum);
    this.setState(
        {
          cardList:cardList
        },()=>{
          // this.add(2)
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