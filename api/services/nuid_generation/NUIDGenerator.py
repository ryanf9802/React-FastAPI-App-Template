import uuid


class NUIDGenerator:
    @staticmethod
    def generate_request_nuid() -> str:
        """Generate a request NUID (prefix=req)

        Returns:
            str: A request NUID (req...)
        """
        return NUIDGenerator._get_nuid_prefixed(prefix="req")

    @staticmethod
    def _get_nuid_prefixed(prefix: str) -> str:
        """
        Generate a NUID with a specified prefix.

        Args:
            prefix (str): A three-character string to prepend to the NUID.

        Returns:
            str: A unique identifier string with the specified prefix.

        Raises:
            ValueError: If the prefix is not exactly three characters long.
        """
        prefix = prefix.lower()
        if len(prefix) != 3:
            raise ValueError("Prefix must be exactly three characters.")

        gen = str(uuid.uuid4())
        gen = prefix + "-" + gen

        return gen
