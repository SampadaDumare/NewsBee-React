import React from 'react'

const Newsitem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className='my-3'>
      <div className="card">
        <div>
          <span className="badge rounded-pill bg-danger" style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0"
          }}>
            {source}
          </span>
        </div>

        <img src={imageUrl ? imageUrl : "https://www.investors.com/wp-content/uploads/2025/03/Stock-Nvidia-CEOJensenEarthGTC-01-company.jpg"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}... </h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sn btn-outline-dark">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default Newsitem
