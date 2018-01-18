/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <UIKit/UIKit.h>
<<<<<<< HEAD

@interface AppDelegate : UIResponder <UIApplicationDelegate>

=======
#import <RCTOneSignal.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>
@property (strong, nonatomic) RCTOneSignal* oneSignal;
>>>>>>> b3958f4ae5cb2052541f471a335ea608e516839c
@property (nonatomic, strong) UIWindow *window;

@end
