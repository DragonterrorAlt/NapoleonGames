Mario.Character = function() {
    this.Large = !1, this.Fire = !1, this.Coins = 0, this.Lives = 3, this.LevelString = "none", this.GroundInertia = .89, this.AirInertia = .89, this.RunTime = 0, this.WasOnGround = !1, this.OnGround = !1, this.MayJump = !1, this.Ducking = !1, this.Sliding = !1, this.JumpTime = 0, this.XJumpSpeed = 0, this.YJumpSpeed = 0, this.CanShoot = !1, this.Width = 4, this.Height = 24, this.World = null, this.Facing = 0, this.PowerUpTime = 0, this.XDeathPos = 0, this.YDeathPos = 0, this.DeathTime = 0, this.WinTime = 0, this.InvulnerableTime = 0, this.Carried = null, this.LastLarge = !1, this.LastFire = !1, this.NewLarge = !1, this.NewFire = !1
  }, Mario.Character.prototype = new Mario.NotchSprite(null), Mario.Character.prototype.Initialize = function(i) {
    this.World = i, this.X = 32, this.Y = 0, this.PowerUpTime = 0, this.RunTime = 0, this.WasOnGround = !1, this.OnGround = !1, this.MayJump = !1, this.Ducking = !1, this.Sliding = !1, this.JumpTime = 0, this.XJumpSpeed = 0, this.YJumpSpeed = 0, this.CanShoot = !1, this.Width = 4, this.Height = 24, this.World = i, this.Facing = 0, this.PowerUpTime = 0, this.XDeathPos = 0, this.YDeathPos = 0, this.DeathTime = 0, this.WinTime = 0, this.InvulnerableTime = 0, this.Carried = null, this.SetLarge(this.Large, this.Fire)
  }, Mario.Character.prototype.SetLarge = function(i, t) {
    t && (i = !0), i || (t = !1), this.LastLarge = this.Large, this.LastFire = this.Fire, this.Large = i, this.Fire = t, this.NewLarge = this.Large, this.NewFire = this.Fire, this.Blink(!0)
  }, Mario.Character.prototype.Blink = function(i) {
    this.Large = i ? this.NewLarge : this.LastLarge, this.Fire = i ? this.NewFire : this.LastFire, this.Large ? (this.Fire ? this.Image = Enjine.Resources.Images.fireMario : this.Image = Enjine.Resources.Images.mario, this.XPicO = 16, this.YPicO = 31, this.PicWidth = this.PicHeight = 32) : (this.Image = Enjine.Resources.Images.smallMario, this.XPicO = 8, this.YPicO = 15, this.PicWidth = this.PicHeight = 16)
  }, Mario.Character.prototype.Move = function() {
    if (0 < this.WinTime) return this.WinTime++, this.Xa = 0, void(this.Ya = 0);
    if (0 < this.DeathTime) return this.DeathTime++, this.DeathTime < 11 ? (this.Xa = 0, this.Ya = 0) : 11 === this.DeathTime ? this.Ya = -15 : this.Ya += 2, this.X += this.Xa, void(this.Y += this.Ya);
    if (0 !== this.PowerUpTime) return 0 < this.PowerUpTime ? (this.PowerUpTime--, this.Blink(0 == (1 & (this.PowerUpTime / 3 | 0)))) : (this.PowerUpTime++, this.Blink(0 == (1 & (-this.PowerUpTime / 3 | 0)))), 0 === this.PowerUpTime && (this.World.Paused = !1), void this.CalcPic();
    0 < this.InvulnerableTime && this.InvulnerableTime--, this.Visible = 0 == (1 & (this.InvulerableTime / 2 | 0)), this.WasOnGround = this.OnGround;
    var i = Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A) ? 1.2 : .6;
    this.OnGround && (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Down) && this.Large ? this.Ducking = !0 : this.Ducking = !1), 2 < this.Xa && (this.Facing = 1), this.Xa < -2 && (this.Facing = -1), Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S) || this.JumpTime < 0 && !this.OnGround && !this.Sliding ? this.JumpTime < 0 ? (this.Xa = this.XJumpSpeed, this.Ya = -this.JumpTime * this.YJumpSpeed, this.JumpTime++) : this.OnGround && this.MayJump ? (Enjine.Resources.PlaySound("jump"), this.XJumpSpeed = 0, this.YJumpSpeed = -1.9, this.JumpTime = 7, this.Ya = this.JumpTime * this.YJumpSpeed, this.OnGround = !1, this.Sliding = !1) : this.Sliding && this.MayJump ? (Enjine.Resources.PlaySound("jump"), this.XJumpSpeed = 6 * -this.Facing, this.YJumpSpeed = -2, this.JumpTime = -6, this.Xa = this.XJumpSpeed, this.Ya = -this.JumpTime * this.YJumpSpeed, this.OnGround = !1, this.Sliding = !1, this.Facing = -this.Facing) : 0 < this.JumpTime && (this.Xa += this.XJumpSpeed, this.Ya = this.JumpTime * this.YJumpSpeed, this.JumpTime--) : this.JumpTime = 0, Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Left) && !this.Ducking && (1 === this.Facing && (this.Sliding = !1), this.Xa -= i, 0 <= this.JumpTime && (this.Facing = -1)), Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Right) && !this.Ducking && (-1 === this.Facing && (this.Sliding = !1), this.Xa += i, 0 <= this.JumpTime && (this.Facing = 1)), (!Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Left) && !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Right) || this.Ducking || this.Ya < 0 || this.OnGround) && (this.Sliding = !1), Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A) && this.CanShoot && this.Fire && this.World.FireballsOnScreen < 2 && (Enjine.Resources.PlaySound("fireball"), this.World.AddSprite(new Mario.Fireball(this.World, this.X + 6 * this.Facing, this.Y - 20, this.Facing))), this.CanShoot = !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A), this.MayJump = (this.OnGround || this.Sliding) && !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S), this.XFlip = -1 === this.Facing, this.RunTime += Math.abs(this.Xa) + 5, Math.abs(this.Xa) < .5 && (this.RunTime = 0, this.Xa = 0), this.CalcPic(), this.Sliding && (this.World.AddSprite(new Mario.Sparkle(this.World, (this.X + 4 * Math.random() - 2 | 0) + 8 * this.Facing, (this.Y + 4 * Math.random() | 0) - 24, 2 * Math.random() - 1, Math.random(), 0, 1, 5)), this.Ya *= .5), this.OnGround = !1, this.SubMove(this.Xa, 0), this.SubMove(0, this.Ya), this.Y > 16 * this.World.Level.Height + 16 && this.Die(), this.X < 0 && (this.X = 0, this.Xa = 0), this.X > 16 * this.World.Level.ExitX && this.Win(), this.X > 16 * this.World.Level.Width && (this.X = 16 * this.World.Level.Width, this.Xa = 0), this.Ya *= .85, this.OnGround ? this.Xa *= this.GroundInertia : this.Xa *= this.AirInertia, this.OnGround || (this.Ya += 3), null !== this.Carried && (this.Carried.X *= this.X + 8 * this.Facing, this.Carried.Y *= this.Y - 2, Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A) || (this.Carried.Release(this), this.Carried = null))
  }, Mario.Character.prototype.CalcPic = function() {
    var i = 0,
      t = 0;
    if (this.Large ? (3 === (i = (this.RunTime / 20 | 0) % 4) && (i = 1), null === this.Carried && 10 < Math.abs(this.Xa) && (i += 3), null !== this.Carried && (i += 10), this.OnGround || (i = null !== this.Carried ? 12 : 10 < Math.abs(this.Xa) ? 7 : 6)) : (i = (this.RunTime / 20 | 0) % 2, null === this.Carried && 10 < Math.abs(this.Xa) && (i += 2), null !== this.Carried && (i += 8), this.OnGround || (i = null !== this.Carried ? 9 : 10 < Math.abs(this.Xa) ? 5 : 4)), this.OnGround && (-1 === this.Facing && 0 < this.Xa || 1 === this.Facing && this.Xa < 0) && ((1 < this.Xa || this.Xa < -1) && (i = this.Large ? 9 : 7), 3 < this.Xa || this.Xa < -3))
      for (t = 0; t < 3; t++) this.World.AddSprite(new Mario.Sparkle(this.World, this.X + 8 * Math.random() - 4 | 0, this.Y + 4 * Math.random() | 0, 2 * Math.random() - 1, -1 * Math.random(), 0, 1, 5));
    this.Large ? (this.Ducking && (i = 14), this.Height = this.Ducking ? 12 : 24) : this.Height = 12, this.XPic = i
  }, Mario.Character.prototype.SubMove = function(i, t) {
    for (var s = !1; 8 < i;) {
      if (!this.SubMove(8, 0)) return !1;
      i -= 8
    }
    for (; i < -8;) {
      if (!this.SubMove(-8, 0)) return !1;
      i += 8
    }
    for (; 8 < t;) {
      if (!this.SubMove(0, 8)) return !1;
      t -= 8
    }
    for (; t < -8;) {
      if (!this.SubMove(0, -8)) return !1;
      t += 8
    }
    return 0 < t && (this.IsBlocking(this.X + i - this.Width, this.Y + t, i, 0) || this.IsBlocking(this.X + i + this.Width, this.Y + t, i, 0) || this.IsBlocking(this.X + i - this.Width, this.Y + t + 1, i, t) || this.IsBlocking(this.X + i + this.Width, this.Y + t + 1, i, t)) && (s = !0), t < 0 && (this.IsBlocking(this.X + i, this.Y + t - this.Height, i, t) || s || this.IsBlocking(this.X + i - this.Width, this.Y + t - this.Height, i, t) || s || this.IsBlocking(this.X + i + this.Width, this.Y + t - this.Height, i, t)) && (s = !0), 0 < i && (this.Sliding = !0, this.IsBlocking(this.X + i + this.Width, this.Y + t - this.Height, i, t) ? s = !0 : this.Sliding = !1, this.IsBlocking(this.X + i + this.Width, this.Y + t - (this.Height / 2 | 0), i, t) ? s = !0 : this.Sliding = !1, this.IsBlocking(this.X + i + this.Width, this.Y + t, i, t) ? s = !0 : this.Sliding = !1), i < 0 && (this.Sliding = !0, this.IsBlocking(this.X + i - this.Width, this.Y + t - this.Height, i, t) ? s = !0 : this.Sliding = !1, this.IsBlocking(this.X + i - this.Width, this.Y + t - (this.Height / 2 | 0), i, t) ? s = !0 : this.Sliding = !1, this.IsBlocking(this.X + i - this.Width, this.Y + t, i, t) ? s = !0 : this.Sliding = !1), s ? (i < 0 && (this.X = 16 * ((this.X - this.Width) / 16 | 0) + this.Width, this.Xa = 0), 0 < i && (this.X = 16 * ((this.X + this.Width) / 16 + 1 | 0) - this.Width - 1, this.Xa = 0), t < 0 && (this.Y = 16 * ((this.Y - this.Height) / 16 | 0) + this.Height, this.JumpTime = 0, this.Ya = 0), 0 < t && (this.Y = 16 * ((this.Y - 1) / 16 + 1 | 0) - 1, this.OnGround = !0), !1) : (this.X += i, this.Y += t, !0)
  }, Mario.Character.prototype.IsBlocking = function(i, t, s, h) {
    var e, n, r = 0,
      a = 0;
    if (t = t / 16 | 0, (i = i / 16 | 0) === (this.X / 16 | 0) && t === (this.Y / 16 | 0)) return !1;
    if (n = this.World.Level.GetBlock(i, t), 0 < (Mario.Tile.Behaviors[255 & n] & Mario.Tile.PickUpable))
      for (this.GetCoin(), Enjine.Resources.PlaySound("coin"), this.World.Level.SetBlock(i, t, 0), r = 0; r < 2; r++)
        for (a = 0; a < 2; a++) this.World.AddSprite(new Mario.Sparkle(this.World, 16 * i + 8 * r + (8 * Math.random() | 0), 16 * t + 8 * a + (8 * Math.random() | 0), 0, 0, 0, 2, 5));
    return (e = this.World.Level.IsBlocking(i, t, s, h)) && h < 0 && this.World.Bump(i, t, this.Large), e
  }, Mario.Character.prototype.Stomp = function(i) {
    var t;
    0 < this.DeathTime || this.World.Paused || (t = i.Y - i.Height / 2, this.SubMove(0, t - this.Y), i instanceof Mario.Enemy || i instanceof Mario.BulletBill ? (Enjine.Resources.PlaySound("kick"), this.XJumpSpeed = 0, this.YJumpSpeed = -1.9, this.JumpTime = 8, this.Ya = this.JumpTime * this.YJumpSpeed, this.OnGround = !1, this.Sliding = !1, this.InvulnerableTime = 1) : i instanceof Mario.Shell && (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A) && 0 === i.Facing ? (this.Carried = i).Carried = !0 : (Enjine.Resources.PlaySound("kick"), this.XJumpSpeed = 0, this.YJumpSpeed = -1.9, this.JumpTime = 8, this.Ya = this.JumpTime * this.YJumpSpeed, this.OnGround = !1, this.Sliding = !1, this.InvulnerableTime = 1)))
  }, Mario.Character.prototype.GetHurt = function() {
    0 < this.DeathTime || this.World.Paused || 0 < this.InvulnerableTime || (this.Large ? (this.World.Paused = !0, this.PowerUpTime = -18, Enjine.Resources.PlaySound("powerdown"), this.Fire ? this.SetLarge(!0, !1) : this.SetLarge(!1, !1), this.InvulnerableTime = 32) : this.Die())
  }, Mario.Character.prototype.Win = function() {
    this.XDeathPos = 0 | this.X, this.YDeathPos = 0 | this.Y, this.World.Paused = !0, this.WinTime = 1, Enjine.Resources.PlaySound("exit")
  }, Mario.Character.prototype.Die = function() {
    this.XDeathPos = 0 | this.X, this.YDeathPos = 0 | this.Y, this.World.Paused = !0, this.DeathTime = 1, Enjine.Resources.PlaySound("death"), this.SetLarge(!1, !1)
  }, Mario.Character.prototype.GetFlower = function() {
    0 < this.DeathTime && this.World.Paused || (this.Fire ? (this.GetCoin(), Enjine.Resources.PlaySound("coin")) : (this.World.Paused = !0, this.PowerUpTime = 18, Enjine.Resources.PlaySound("powerup"), this.SetLarge(!0, !0)))
  }, Mario.Character.prototype.GetMushroom = function() {
    0 < this.DeathTime && this.World.Paused || (this.Large ? (this.GetCoin(), Enjine.Resources.PlaySound("coin")) : (this.World.Paused = !0, this.PowerUpTime = 18, Enjine.Resources.PlaySound("powerup"), this.SetLarge(!0, !1)))
  }, Mario.Character.prototype.Kick = function(i) {
    0 < this.DeathTime && this.World.Paused || (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A) ? (this.Carried = i).Carried = !0 : (Enjine.Resources.PlaySound("kick"), this.InvulnerableTime = 1))
  }, Mario.Character.prototype.Get1Up = function() {
    Enjine.Resources.PlaySound("1up"), this.Lives++, 99 === this.Lives && (this.Lives = 99)
  }, Mario.Character.prototype.GetCoin = function() {
    this.Coins++, 100 === this.Coins && (this.Coins = 0, this.Get1Up())
  };