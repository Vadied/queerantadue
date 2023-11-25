import { Schema, models, model } from 'mongoose';
import mongooseHidden from 'mongoose-hidden';
import bcrypt from 'bcryptjs';

const SALT = 43;

const schema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
    password: {
      type: String,
      required: true,
      hide: true
    },
    token: { type: String, unique: true, hide: true },
    image: String
  },
  { timestamps: true }
);

schema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password') || user.isNew) return next();

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

schema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

schema.methods.getToken = function () {
  return this.token;
};

schema.plugin(mongooseHidden({ hidden: { password: true } }));

export const User = models.User || model('User', schema);
