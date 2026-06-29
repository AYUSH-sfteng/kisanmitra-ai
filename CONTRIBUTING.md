# Contributing Guidelines - KisanMitra AI

Thank you for choosing to contribute to KisanMitra AI! We welcome bug fixes, documentation additions, and agent module extensions.

---

## 1. Branch Strategy
- **main**: Stable, deployment-ready code.
- **dev**: Target branch for feature merges.
- **feature/your-feature-name**: Branch from `dev` to write code.

---

## 2. Setting Up Local Environment
Please consult the [Developer Guide](docs/developer_guide.md) to set up and run the local frontend and backend servers.

---

## 3. Pull Request Guidelines
1. Fork the repository and create your feature branch from `dev`.
2. Follow standard coding styles:
   - **Frontend**: Clean Tailwind CSS utility combinations, React functional hooks.
   - **Backend**: Type-annotated Python (Pydantic models, FastAPI routes).
3. Verify that the test builds run successfully:
   ```bash
   # In frontend
   npm run build
   ```
4. Submit your pull request against the `dev` branch. Explain your changes and references inside the PR description.
