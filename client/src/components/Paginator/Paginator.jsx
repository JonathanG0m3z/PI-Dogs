import styles from './Paginator.module.css';

export default function Paginator({setPage, setPageChange, cardsPerPage,page,dataLength}) {
  const numPages = Math.ceil(dataLength/cardsPerPage);

    const onClick = (event)=>{
        setPageChange(true);
        setPage(Number(event.target.id));
    };

    const createButtons = (num)=>{
      const result=[];
        if(page!==1) result.push(<li><a onClick={onClick} id={page-1} >{page-1}</a></li>);
        result.push(<div className={styles.current}><li><a onClick={onClick} id={page} >{page}</a></li></div>);
        if(page!==numPages) result.push(<li><a onClick={onClick} id={page+1} >{page+1}</a></li>);
      return result;
    };

    return(
      <>
        <div class={styles.container}>
        <ul class={styles.pagination}>
          {numPages===0?<li><a><span></span>0</a></li>:<>{page!=1?<li class={styles.icon}>
            <a onClick={onClick} id={page-1}><span class="fas fa-angle-left"></span>Previous</a>
          </li>:""}
          {page>2?<><li><a onClick={onClick} id={1}><span></span>1</a></li>
          <li><a><span></span>...</a></li></>:''}
          {createButtons(numPages)}
          {page<21?<><li><a><span></span>...</a></li>
          <li><a onClick={onClick} id={numPages}><span></span>{numPages}</a></li>
          </>:''}
          {page!=numPages?<li class={styles.icon}>
            <a onClick={onClick} id={page+1}>Next<span class="fas fa-angle-right"></span></a>
          </li>:""}</>}
          
        </ul>
      </div> 
      </>
    )
}