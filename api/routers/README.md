# routers

## Overview

This directory contains FastAPI routers, grouping related endpoints by feature or application area (e.g., `users`, `infrastructure`, `auth`). Each router file defines a set of routes with a common URL prefix and tags.

---

## Naming Conventions

| File Name              | Router Variable | URL Prefix    | Tags         |
| ---------------------- | --------------- | ------------- | ------------ |
| `<resource>_router.py` | `router`        | `/<resource>` | `<Resource>` |

---

## Router & Endpoint Standards

- Use `APIRouter` for grouping related endpoints.
- Prefix and tags must match the resource name.
- Each endpoint **must** include:
  - `summary`: brief description
  - `description`: detailed explanation
  - `response_model`: Pydantic schema
  - `status_code`: expected success code
  - `responses`: dictionary of possible error codes with descriptions

### Example Endpoint

```python
from pydantic import BaseModel

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    model_config = ConfigDict(from_attributes=True)

from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter(prefix="/users", tags=["Users"])

@router.get(
    "/",
    summary="Retrieve all users",
    description="Returns a list of all registered users.",
    response_model=list[UserResponse],
    status_code=200,
    responses={
        404: {"description": "No users found"},
        500: {"description": "Internal server error"}
    }
)
async def list_users():
    try:
        users = await fetch_all_users()  # returns list[dict]
        if not raw_list:
            raise HTTPException(status_code=404, detail="No users found")
        return [UserResponse(**user) for user in users]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")
```

---

## Adding New Routers

1. Create a file named `<feature>_router.py`.
2. Instantiate `APIRouter` with appropriate prefix and tags.
3. Define endpoints following the standards above.
4. Include the router in the application entry point (`src/root.py`)

```python
from routers.<feature>_router import router as feature_router
app.include_router(feature_router)
```

---

## References

- FastAPI Routers: https://fastapi.tiangolo.com/tutorial/bigger-applications/
- FastAPI Path Operation Configuration: https://fastapi.tiangolo.com/tutorial/path-operation-configuration/
