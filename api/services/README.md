# services

## Overview

This directory contains individual service modules that encapsulate discrete functionality used throughout the application. Each service has a clearly defined purpose, usage example, and documentation so its original intent remains clear — making it easier to decide when to extend, refactor, or split services as the codebase grows.

---

## Adding New Services

1. Create a file named `<your_service>_service.py` in this directory.
2. Define a single responsibility for the service module.
3. Document the service here with:
   - Purpose
   - Usage example
   - API documentation for its public functions/classes
4. Import and use the service in your application where needed.

---

## Services

### Logger

**File:** `services/logging/Logger.py`

**Purpose:**  
Configure and initialize application‑wide logging. Ensures consistent log formatting, file management, and exclusion of noisy loggers.

**Usage Example:**

```python
from services.logger_service import initialize_logging
import logging
initialize_logging()

def main():
    logger = logging.getLogger(__name__)
    logger.info("Application started")
```
