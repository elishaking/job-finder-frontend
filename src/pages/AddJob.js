import React, { Component } from "react";
import axios from "axios";

import Spinner from "../components/Spinner";

export default class AddJob extends Component {
  state = {
    title: "",
    technologies: "",
    budget: "",
    description: "",
    contactEmail: "",

    errors: {},

    loading: false,
  };

  addJob = (e) => {
    e.preventDefault();

    const {
      title,
      technologies,
      budget,
      description,
      contactEmail,
      loading,
    } = this.state;

    if (loading) return;

    const newJob = {
      title,
      technologies,
      budget,
      description,
      contactEmail,
    };

    this.setState({ loading: true });

    axios
      .post("/api/v1/jobs", newJob)
      .then((res) => {
        const resData = res.data;

        this.setState({ loading: false });

        if (resData.success)
          return this.props.history.replace("/jobs", {
            type: "saved",
          });
      })
      .catch((err) => {
        this.setState({ loading: false, errors: err.response.data.data });

        if (err.response.data.statusCode !== 400)
          alert("Something went wrong, please try again");
      });

    // fetch("/api/v1/jobs", {
    //   method: "POST",
    //   body: JSON.stringify(newJob),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((resData) => {
    //     this.setState({ loading: false });

    //     if (resData.success) return this.props.history.replace("/jobs");

    //     this.setState({ errors: resData.data });
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false });
    //     alert("Something went wrong, please try again");
    //   });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { errors, loading } = this.state;

    return (
      <div>
        <h1>Add Job</h1>

        <form className="add-job-form" onSubmit={this.addJob}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Full Stack Engineer"
            onChange={this.onChange}
            className={errors.title ? "error" : ""}
          />
          {errors.title && <small>{errors.title}</small>}

          <label htmlFor="technologies">Technologies</label>
          <input
            type="text"
            name="technologies"
            placeholder="e.g. PERN, Angular, MERN, Vue"
            onChange={this.onChange}
            className={errors.technologies ? "error" : ""}
          />
          {errors.technologies && <small>{errors.technologies}</small>}

          <label htmlFor="budget">Budget</label>
          <input
            type="number"
            name="budget"
            placeholder="e.g. 500000"
            onChange={this.onChange}
            className={errors.budget ? "error" : ""}
          />
          {errors.budget && <small>{errors.budget}</small>}

          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="What is this job about?"
            onChange={this.onChange}
            className={errors.description ? "error" : ""}
          />
          {errors.description && <small>{errors.description}</small>}

          <label htmlFor="contactEmail">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            placeholder="Your email"
            onChange={this.onChange}
            className={errors.contactEmail ? "error" : ""}
          />
          {errors.contactEmail && <small>{errors.contactEmail}</small>}

          <button type="submit" disabled={loading}>
            Add Job
          </button>

          {loading && <Spinner />}
        </form>
      </div>
    );
  }
}
