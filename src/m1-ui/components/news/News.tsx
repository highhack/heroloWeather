import React from 'react';
import s from './News.module.scss'
import news from './../../common/IuF.gif'


const News = React.memo( () => {
    return (
        <div className={s.news}>
            <div>
                <div>News</div>
                <img className={s.img} alt={''} src={news}/>
            </div>
        </div>

    )
});

export default News;