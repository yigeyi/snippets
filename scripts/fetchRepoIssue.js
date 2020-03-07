const fetch = require('node-fetch')

const GITHUB_ISSUE_API = ({owner, repo}) => {
  return `https://api.github.com/repos/${owner}/${repo}/issues${generateQuery({owner, repo})}`
}

const generateQuery = ({owner, token}) => {
  return `?creator=${owner}&per_page=1000&access_token=${token}`
}

const REDIRECT_URL = ({owner, repo}) => {
  return `https://github.com/${owner}/${repo}/issues`;
}

const CONFIG = {
  owner: process.env.GITHUB_LOGIN,
  repo: process.env.GITHUB_REPO,
  token: process.env.GITHUB_TOKEN
}

module.exports = () => {
  return new Promise((resolve, reject) => {
    fetch(GITHUB_ISSUE_API(CONFIG))
      .then(res => res.json())
      .then(json => {
        resolve(json)
      })
      .catch(e => {
        reject(e)
      })
  })
}