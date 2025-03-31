from fastapi import APIRouter, HTTPException

from models.example_user_models import ExampleUserCreate, ExampleUserResponse 

router = APIRouter(prefix="/example_users", tags=["Example Users"])

@router.get(
    "/user_list",
    summary="Example User List",
    description="Example router endpoint to retrieve a list of users using a Pydantic model.",
    response_model=list[ExampleUserResponse],
    status_code=200,
    responses={
        404: {"description": "No users found"},
        500: {"description": "Internal server error"}
    }
)
async def list_users():
    try:
        users = [
            {"id": 1, "username": "johndoe", "email": "john.doe@example.com"},
            {"id": 2, "username": "janedoe", "email": "jane.doe@example.com"}
        ]
        if not users:
            raise HTTPException(status_code=404, detail="No users found")
        return [ExampleUserResponse(**user) for user in users]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")
    
@router.post(
    "/create_user",
    summary="Create a new user",
    description="Creates a new user from the supplied data.",
    response_model=ExampleUserResponse,
    status_code=201,
    responses={
        400: {"description": "Invalid user data"},
        500: {"description": "Internal server error"}
    }
)
async def create_user(user: ExampleUserCreate):
    try:
        new_user = {"id": 1, "username": user.username, "email": user.email}
        return ExampleUserResponse(**new_user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")
