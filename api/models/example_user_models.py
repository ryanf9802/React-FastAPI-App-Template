from pydantic import BaseModel, Field, EmailStr, field_validator, ConfigDict

class ExampleUserCreate(BaseModel):
    """Schema for creating a new user."""
    username: str = Field(..., min_length=3, max_length=50, description="Unique username")
    email: EmailStr = Field(..., description="User's email address")
    password: str = Field(..., min_length=8, description="Secure password")

    @field_validator("username")
    def no_spaces_in_username(cls, value: str) -> str:
        if " " in value:
            raise ValueError("Username must not contain spaces")
        return value

    # Enable ORM compatibility (reads attributes, not just dict keys)
    model_config = ConfigDict(from_attributes=True)


class ExampleUserResponse(BaseModel):
    id: int
    username: str
    email: str

    model_config = ConfigDict(from_attributes=True)