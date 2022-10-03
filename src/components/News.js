import styles from './News.module.css';
import NewsCard from './NewsCard';
const News = props => {
    const newsList = props.newsList;
    return (
        <div className={`${props.className} ${styles['news-container']}`}>
            {
                newsList.map((newsItem) => (
                    <NewsCard key={newsItem.id} news={newsItem} />
                ))
            }

        </div>
    )
}

export default News;