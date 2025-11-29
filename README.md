# SWAWebApp

## Figma MCP サーバーの設定

1. `.env.example` を複製して `.env` を作成し、`FIGMA_API_KEY` に Figma のパーソナルアクセストークンを設定します。
2. `.env` は `.gitignore` 済みのためコミットされません。
3. コマンド実行前に環境変数を読み込むようにしてください。例:

	```cmd
	setx FIGMA_API_KEY "<your-token>"
	```

	または、一時的に:

	```cmd
	set FIGMA_API_KEY=<your-token> && npx -y figma-developer-mcp --stdio
	```

	`.env` を利用する場合は `dotenv` などで読み込んでから同コマンドを実行します。