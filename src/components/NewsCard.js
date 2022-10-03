import styles from './NewsCard.module.css';
import Card from './shared/Card';
const NewsCard = props => {
    const news = props.news;
    return (
        <Card className={styles['news-card']}>
            <div className={styles['news-container']}>
                <div className={styles['image-container']} style={{ backgroundImage: `url(${news.imageUrl})` }}>
                    {/* <img className={styles.image} src={news.imageUrl} alt={news.author} /> */}
                </div>
                <div className={styles.news}>
                    <h3>{`${news.title}`}</h3>
                    <p><b>Story by</b> <span>{`${news.author} - ${news.time} on ${news.date}`}</span></p>
                    <span>{`${news.content}`}</span><br /><br />
                    <span>Read more at : <b><a href={news.readMoreUrl} target="_blank">ANI</a></b></span><br />
                    <span>Read  : <b><a href={news.url} target="_blank">inshorts</a></b></span>
                </div>
            </div>
        </Card>
    )
}

export default NewsCard;