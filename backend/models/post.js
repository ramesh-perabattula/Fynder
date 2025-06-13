 const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['lost', 'found']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  //not working yet done at the last
  // image: {
  //   type: String,
  //   default: null,
  //   validate: {
  //     validator: function(v) {
  //       return v === null || (typeof v === 'string' && v.startsWith('data:image/'));
  //     },
  //     message: 'Image must be a valid base64 image string or null'
  //   }
  // },
  // status: {
  //   type: String,
  //   enum: ['open', 'resolved'],
  //   default: 'open'
  // },
  // likes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//image save before --(not added yet)
// postSchema.pre('save', function(next) {
//   if (this.isModified('image')) {
//     console.log('Image data being saved:', {
//       hasImage: !!this.image,
//       imageType: this.image ? this.image.split(';')[0].split(':')[1] : null,
//       imageSize: this.image ? Math.ceil((this.image.split(',')[1].length * 3) / 4) / (1024 * 1024) : 0
//     });
//   }
//   next();
// });

module.exports = mongoose.model('Post', postSchema); 