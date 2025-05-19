from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# Request Schema for User Creation
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)

# Request Schema for User Login  
class UserLogin(BaseModel):
    username: str
    password: str

# Response Schema for User Data
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Token Schema for JWT responses
class Token(BaseModel):
    access_token: str
    token_type: str

# Token Data Schema for decoded payload
class TokenData(BaseModel):
    username: Optional[str] = None