package backend

import (
	"context"
	"fmt"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"time"
)

const defaultHours = 1
const defaultMinutes = 0
const defaultTimerActive = true

type Backend struct {
	hours       int
	minutes     int
	timerActive bool
	ctx         context.Context
	timer       *time.Timer
	bool
}

func NewBackend() *Backend {
	return &Backend{
		hours:       defaultHours,
		minutes:     defaultMinutes,
		timerActive: defaultTimerActive,
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

func (b *Backend) TimerActive() bool {
	return b.timerActive
}

func (b *Backend) SetTimerDuration(hours int, minutes int) {
	b.hours = hours
	b.minutes = minutes
	b.stopTimer()
	b.notifyTimerExpired()
}

func (b *Backend) ToggleTimer() {
	b.timerActive = !b.timerActive
	b.stopTimer()
	b.notifyTimerExpired()
}

func (b *Backend) StartTimer() {
	// stop current timer, if present
	b.stopTimer()

	// if not timer active, return
	if !b.timerActive {
		return
	}

	// if timer active, start a new timer
	duration := time.Duration(b.hours)*time.Hour + time.Duration(b.minutes)*time.Minute

	fmt.Printf("Starting timer for %v hours and %v minutes (%v total)\n", b.hours, b.minutes, duration)

	b.timer = time.AfterFunc(duration, func() {
		b.notifyTimerExpired()
		runtime.EventsEmit(b.ctx, "breakTime")
	})
	runtime.EventsEmit(b.ctx, "timerStarted")
}

func (b *Backend) notifyTimerExpired() {
	runtime.EventsEmit(b.ctx, "timerExpired")
}

func (b *Backend) stopTimer() {
	if b.timer != nil {
		b.timer.Stop()
		b.timer = nil
	}
}
