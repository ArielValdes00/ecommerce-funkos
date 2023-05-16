import jwt from 'jsonwebtoken';
import express from "express";

import cookieParser from 'cookie-parser';

export const checkAuth = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    const token = authorizationHeader.split(' ')[1];
    
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      req.user = decoded;
      next();
    });
  };
  


const app = express();
app.use(cookieParser());