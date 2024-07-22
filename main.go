package main

import (
	"break-reminder/backend"
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	b := backend.NewBackend()

	// create application with options
	err := wails.Run(&options.App{
		Title:  "Break reminder",
		Width:  700,
		Height: 400,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        b.Startup,
		Bind: []interface{}{
			b,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
