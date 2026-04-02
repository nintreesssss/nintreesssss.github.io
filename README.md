# nintreesssss.github.io

此仓库为 Hugo 静态站点源码，已为 GitHub Pages 做好准备。

快速说明：

- 已将 `baseURL` 设为 `https://nintreesssss.github.io/`（见 `hugo.toml`）。
- Hugo 构建输出目录已配置为 `docs/`（`publishDir = "docs"`）。

部署到 GitHub Pages（两种常见方式，推荐第一种）：

1) 使用 `docs/`（推荐，简单）
   - 在本地运行 `hugo`：

```bash
hugo
```

   - Hugo 会把静态站点输出到仓库根的 `docs/` 文件夹。
   - 将 `docs/` 以及源码一起提交到 `main` 分支并推送到 GitHub。
   - 在仓库的 GitHub Pages 设置中，将 Source 设为 `main` branch / `docs` folder，然后等待发布。

2) 使用 GitHub Actions 或 `gh-pages` 分支（可选）
   - 如果你希望自动在每次 push 后构建并部署，可以使用 `actions-gh-pages` 或其他 CI 做自动部署。我可以帮你添加 CI 配置。

注意事项：
- 若你希望站点使用自定义域，请更改 `baseURL` 并在仓库根放置 `CNAME` 文件。
- 目前已将静态资源路径改为绝对路径（`/css/...`、`/js/...`、`/images/...`），并将可配置项放在 `hugo.toml` 的 `[params]` 下，方便后续维护。

需要我现在为你：
- 运行 `hugo` 生成 `docs/` 并在仓库中创建提交？（需要你允许我执行 git 操作）
- 或者为你添加 GitHub Actions 自动构建部署配置？

请选择下一步。