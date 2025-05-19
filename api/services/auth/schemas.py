from pydantic import BaseModel, EmailStr, Field, ConfigDict

class UserCreate(BaseModel):
    """
    Schema for user registration request
    """
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserResponse(BaseModel):
    """
    Schema for user response
    """
    id: int
    email: EmailStr
    is_active: bool
    
    model_config = ConfigDict(from_attributes=True)
    
class UserCount(BaseModel):
    """
    Schema for user count response
    """
    count: int