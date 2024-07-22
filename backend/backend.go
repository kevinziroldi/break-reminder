package backend

import (
	"context"
	"fmt"
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
	stopChannel chan struct{}
}

func NewBackend() *Backend {
	return &Backend{
		hours:       defaultHours,
		minutes:     defaultMinutes,
		timerActive: defaultTimerActive,
		stopChannel: make(chan struct{}),
	}
}

func (b *Backend) Startup(ctx context.Context) {
	b.ctx = ctx
}

func (b *Backend) Hours() int {
	return b.hours
}

func (b *Backend) SetHours(hours int) {
	b.hours = hours
	fmt.Printf("Hours changed, new value is: %v\n", b.hours)
	b.RestartTimer()
}

func (b *Backend) Minutes() int {
	return b.minutes
}

func (b *Backend) SetMinutes(minutes int) {
	b.minutes = minutes
	fmt.Printf("Minutes changed, new value is: %v\n", b.minutes)
	b.RestartTimer()
}

func (b *Backend) TimerActive() bool {
	return b.timerActive
}

func (b *Backend) ToggleTimer() {
	b.timerActive = !b.timerActive
	fmt.Printf("Timer switch toggled, new value is: %v\n", b.timerActive)
	b.RestartTimer()
}

func (b *Backend) RestartTimer() {
	// stop current timer, if present
	if b.timer != nil {
		b.timer.Stop()
		close(b.stopChannel)
	}

	// if not timer active, return
	if !b.timerActive {
		b.timer = nil
		return
	}

	// if timer active, start a new timer
	// TODO
}

func (b *Backend) notifyTimerExpired() {
	// TODO
}
