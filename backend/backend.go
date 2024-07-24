package backend

import (
	"context"
	"github.com/gen2brain/beeep"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"time"
)

const defaultHours = 1
const defaultMinutes = 0
const defaultSeconds = 0

type Backend struct {
	hours   int
	minutes int
	seconds int
	ctx     context.Context
	timer   *time.Timer
}

func NewBackend() *Backend {
	return &Backend{
		hours:   defaultHours,
		minutes: defaultMinutes,
		seconds: defaultSeconds,
	}
}

func (b *Backend) Startup(ctx context.Context) {
	b.ctx = ctx
}

func (b *Backend) Hours() int {
	return b.hours
}

func (b *Backend) Minutes() int {
	return b.minutes
}

func (b *Backend) Seconds() int {
	return b.seconds
}

func (b *Backend) SetTimerDuration(hours int, minutes int, seconds int) {
	// stop timer (no timer should be set)
	b.StopTimer()

	// set new duration
	b.hours = hours
	b.minutes = minutes
	b.seconds = seconds
}

func (b *Backend) StartTimer() {
	// stop current timer, if present
	b.StopTimer()

	// compute duration
	duration := time.Duration(b.hours)*time.Hour + time.Duration(b.minutes)*time.Minute + time.Duration(b.seconds)*time.Second
	// start timer
	b.timer = time.AfterFunc(duration, func() {
		// emit event
		runtime.EventsEmit(b.ctx, "breakTime")

		// send notification
		err := beeep.Notify(
			"Break reminder",
			"Time for a break! ⏰", "build/appicon.png")
		if err != nil {
			panic(err)
		}

	})
}

func (b *Backend) StopTimer() {
	if b.timer != nil {
		b.timer.Stop()
		b.timer = nil
	}
}
