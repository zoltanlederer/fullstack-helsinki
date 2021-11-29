const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (array) => {
  return array.reduce((total, likes) => total + likes.likes, 0)
}

const favoriteBlog = (array) => {
  return array.reduce((total, obj) =>obj.likes > total.likes ? obj : total)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}