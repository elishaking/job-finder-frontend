import React, { Component } from "react";
import axios from "axios";

import Spinner from "../components/Spinner";

const JOB_CATEGORY = {
  SAVED: "saved",
  ONLINE: "online",
};

export default class Jobs extends Component {
  state = {
    jobs: [],

    loading: true,
  };

  category = JOB_CATEGORY.ONLINE;

  constructor(props) {
    super(props);

    if (this.props.location.state) {
      // const { jobs } = this.props.location.state;
      // if (jobs.length > 0) return this.setState({ jobs, loading: false });

      const { type } = this.props.location.state;
      if (type && type === "saved") this.category = JOB_CATEGORY.SAVED;
    }
  }

  componentDidMount() {
    this.fetchJobs();
  }

  fetchJobs = () => {
    let url = "/api/v1/jobs";

    if (this.category === JOB_CATEGORY.ONLINE)
      url =
        "/api/v1/jobs/online" +
        (this.props.location.state ? `/${this.props.location.state.term}` : "");

    axios
      .get(url)
      .then((res) => {
        const resData = res.data;

        this.setState({
          jobs: resData.data,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ loading: false });

        alert("Something went wrong, Please try again");
      });
  };

  onChange = (e) => {
    const category = e.target.value;

    if (this.category === category) return;

    this.category = category;

    this.setState({ loading: true });
    this.fetchJobs();
  };

  render() {
    const { jobs, loading } = this.state;

    return (
      <div>
        <div className="heading">
          <h1>Jobs</h1>

          <select
            name="category"
            onChange={this.onChange}
            value={this.category}
          >
            <option value="online">Online Jobs</option>
            <option value="saved">Saved Jobs</option>
          </select>
        </div>

        <div className="jobs">
          {loading ? (
            <Spinner />
          ) : (
            jobs.map((currentJob, index) => {
              const job =
                this.category === JOB_CATEGORY.SAVED
                  ? jobs[jobs.length - index - 1]
                  : currentJob;

              return (
                <div key={index} className="job">
                  <h2>
                    {job.title}
                    {job.type && <span> &middot; {job.type}</span>}
                  </h2>
                  {job.company && <h3>{job.company}</h3>}
                  {job.budget && (
                    <small>
                      ${job.budget} &middot; {job.technologies}
                    </small>
                  )}
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  ></div>
                  {job.how_to_apply &&
                    (() => {
                      // const r = /<a href="(.*)">|<a href='(.*)'>/;
                      // console.log(job.how_to_apply);
                      // const link = r.exec(job.how_to_apply)[1];

                      return (
                        <div
                          dangerouslySetInnerHTML={{ __html: job.how_to_apply }}
                        ></div>
                      );

                      // return (
                      //   <a
                      //     className="apply-link"
                      //     href={link}
                      //     target="_blank"
                      //     rel="noopener noreferrer"
                      //   >
                      //     Apply
                      //   </a>
                      // );
                    })()}
                  <small>{job.contactEmail}</small>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
