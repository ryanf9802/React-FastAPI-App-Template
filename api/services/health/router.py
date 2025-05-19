from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text, func
from services.database import get_session
from services.database.models import User

router = APIRouter(prefix="/health", tags=["health"])


@router.get("/")
async def health_check():
    return {"status": "ok", "version": "0.1.0"}


@router.get("/db")
async def db_health_check(db: Session = Depends(get_session)):
    """Executes a simple query to check database connectivity"""
    try:
        # Execute a simple query to check database connectivity
        result = db.execute(text("SELECT 1")).fetchone()
        if result and result[0] == 1:
            return {"status": "ok", "database": "connected", "result": result}
        else:
            raise HTTPException(status_code=500, detail="Database check failed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.get("/users/count")
async def users_count(db: Session = Depends(get_session)):
    """
    Get the number of users in the database
    """
    try:
        count = db.query(func.count(User.id)).scalar()
        return {"count": count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error counting users: {str(e)}")

