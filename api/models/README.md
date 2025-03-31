# models

## Overview

This directory contains **Pydantic models** used by FastAPI endpoints to standardize request and response data across the application.

Each file groups related schemas by resource or feature (e.g., `infrastructure.py`, `auth.py`).

---

## Naming Conventions

| Model Type        | Class Name Pattern   | Purpose                           |
| ----------------- | -------------------- | --------------------------------- |
| Request Schema    | `<Resource><Action>` | Input payload for API endpoints   |
| Response Schema   | `<Resource>Response` | Output payload from API endpoints |
| Shared/Base Model | `<Resource>Base`     | Reusable fields across schemas    |

---

## Pydantic Model Standards

- Inherit from `pydantic.BaseModel`.
- Use **type annotations** for all fields.
- Provide **descriptive docstrings** for classes.
- Leverage `Field(...)` for metadata (title, description, defaults, validation constraints).
- Implement `@validator` methods for custom validation logic.
- Enable ORM compatibility when needed via a Config subclass:

  class Config:
  orm_mode = True

### Example Model

```python
from pydantic import BaseModel, Field, EmailStr, field_validator, ConfigDict

class ExampleUserCreate(BaseModel):
    """Schema for creating a new user."""
    username: str = Field(..., min_length=3, max_length=50, description="Unique username")
    email: EmailStr = Field(..., description="User's email address")
    password: str = Field(..., min_length=8, description="Secure password")

    # Pydantic v2 validator
    @field_validator("username")
    def no_spaces_in_username(cls, value: str) -> str:
        if " " in value:
            raise ValueError("Username must not contain spaces")
        return value

    # Enable ORM compatibility (reads attributes, not just dict keys)
    model_config = ConfigDict(from_attributes=True)
```

---

## Adding New Models

1. Create a new file named after the resource (e.g., `auth.py`).
2. Define request, response, and base models following the standards above.
3. Import new classes in `models/__init__.py` for centralized access.

---

## Testing

- Use **pytest** to assert schema validation behavior.
- Test invalid payloads raise `ValidationError`.
- Confirm correct serialization of ORM objects when `orm_mode` is enabled.

---

## References

- Pydantic docs: https://docs.pydantic.dev/
- FastAPI models: https://fastapi.tiangolo.com/tutorial/schema/
