import uuid


class UIDGenerator:
    @staticmethod
    def generate_request_uid() -> str:
        """Generate a request UID (prefix=req)

        Returns:
            str: A request UID (req...)
        """
        return UIDGenerator._get_uid_prefixed(prefix="req")

    @staticmethod
    def _get_uid_prefixed(prefix: str) -> str:
        """
        Generate a UID with a specified prefix.

        Args:
            prefix (str): A three-character string to prepend to the UID.

        Returns:
            str: A unique identifier string with the specified prefix.

        Raises:
            ValueError: If the prefix is not exactly three characters long.
        """
        prefix = prefix.lower()
        if len(prefix) != 3:
            raise ValueError("Prefix must be exactly three characters.")

        gen = str(uuid.uuid4().hex)
        gen = prefix + "-" + gen

        return gen
