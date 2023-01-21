import { useSelector } from 'react-redux';
import styles from './Paginator.module.css';

export default function Paginator({setPage, setPageChange, cardsPerPage,page}) {
  const numPages = useSelector((state)=>Math.ceil(state.breeds.length/cardsPerPage));

    const onClick = (event)=>{
        setPageChange(true);
        setPage(Number(event.target.id));
    };

    const createButtons = (num)=>{
      const result=[];
      for (let i = 1; i <= num; i++) {
        // i<=9 &&
        result.push(<li><a onClick={onClick} id={i} >{i}</a></li>);
        // if(i===9)result.push(<li><a >...</a></li>)&&result.push(<li><a onClick={onClick} id={num} >{num}</a></li>);
      }
      return result;
    };

    return(
      <>
        <div class={styles.container}>
        <ul class={styles.pagination}>
          {page!=1?<li class={styles.icon}>
            <a onClick={onClick} id={page-1}><span class="fas fa-angle-left"></span>Previous</a>
          </li>:""}
          {createButtons(numPages)}
          {page!=numPages?<li class={styles.icon}>
            <a onClick={onClick} id={page+1}>Next<span class="fas fa-angle-right"></span></a>
          </li>:""}
        </ul>
      </div> 
      </>
    )
}